import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSession } from "@/lib/auth";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Initialize R2 S3 Client
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

export async function POST(request: Request) {
  // Auth check — only admin can upload
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // File type validation
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type) ||
                    /\.(mp4|webm|ogg|mov)$/i.test(file.name);
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type) ||
                    /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name);

    if (!isVideo && !isImage) {
      return NextResponse.json(
        { error: "Loại file không được hỗ trợ. Chỉ chấp nhận ảnh (JPG, PNG, WebP, GIF, SVG) và video (MP4, WebM, OGG, MOV)." },
        { status: 400 }
      );
    }

    // File size validation
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      const maxMB = maxSize / (1024 * 1024);
      return NextResponse.json(
        { error: `File quá lớn. Giới hạn: ${maxMB}MB cho ${isVideo ? "video" : "ảnh"}.` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (isVideo && process.env.R2_BUCKET_NAME && process.env.R2_ACCOUNT_ID) {
      const uniqueFileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const key = `videos/${uniqueFileName}`;

      await r2Client.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: key,
          Body: buffer,
          ContentType: file.type || "video/mp4",
        })
      );

      const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;
      return NextResponse.json({ url: publicUrl, publicId: key });
    }

    // Upload to Cloudinary using upload_stream (default for images)
    const result = await new Promise<any>((resolve, reject) => {
      const uploadOptions: any = {
        folder: "loops",
        resource_type: "auto", // Automatically detects image or video
      };

      if (type === "og") {
        uploadOptions.transformation = [
          { width: 1200, height: 630, crop: "fill", gravity: "auto" }
        ];
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
