'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Github, Download, Shield, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const YouTubeDownloader = () => {
  const [url, setUrl] = useState('');
  const { resolvedTheme, setTheme } = useTheme();

  const handleDownload = async () => {
    try {
      const apiUrl = `/api/download?url=${encodeURIComponent(url)}`;
      window.location.href = apiUrl;
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="theme-wrapper min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-transition bg-gradient-to-br from-background to-muted">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className="relative w-[1.2rem] h-[1.2rem]">
          <Sun className="h-[1.2rem] w-[1.2rem] absolute transition-all duration-200 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="h-[1.2rem] w-[1.2rem] absolute transition-all duration-200 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        </div>
        <Switch
          checked={resolvedTheme === 'dark'}
          onCheckedChange={() => {
            const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
          }}
          className="data-[state=checked]:bg-primary transition-all duration-200"
        />
      </div>

      <Card className="w-full max-w-xl border-border theme-wrapper">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent transition-all duration-200">
            a4
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground transition-colors duration-200">
            aapelix&apos;s yt to mp4 converter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter YouTube URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 transition-all duration-200"
            />
            <Button 
              onClick={handleDownload} 
              className="bg-primary hover:bg-primary/90 transition-all duration-200"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
          
          <div className="flex justify-center gap-6 pt-4">
            <div className="flex items-center text-sm text-muted-foreground transition-colors duration-200">
              <Shield className="h-4 w-4 mr-1" />
              Secure & Private
            </div>
            <a
              href="https://github.com/aapelix/a4.aapelix.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Github className="h-4 w-4 mr-1" />
              Open Source
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeDownloader;