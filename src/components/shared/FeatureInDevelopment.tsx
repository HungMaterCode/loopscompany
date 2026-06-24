"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Hammer, Sparkles, X } from 'lucide-react';
import { cn } from '@/components/ui/utils';

interface FeatureInDevelopmentProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export function FeatureInDevelopment({
  isOpen,
  onClose,
  featureName = "Tính năng này",
}: FeatureInDevelopmentProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl",
          "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10",
          "shadow-2xl shadow-black/20"
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative p-6 sm:p-8">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-primary/20 blur-2xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 bg-blue-500/20 blur-2xl rounded-full pointer-events-none" />
          
          <div className="relative flex flex-col items-center text-center">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 shadow-inner"
            >
              <Hammer className="h-10 w-10 text-primary" />
            </motion.div>
            
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              Đang phát triển <Sparkles className="h-5 w-5 text-yellow-500" />
            </h3>
            
            <p className="mb-8 text-base text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-primary">{featureName}</span> hiện đang được đội ngũ của chúng tôi phát triển và hoàn thiện. Vui lòng quay lại sau!
            </p>
            
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
