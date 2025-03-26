/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState, useEffect } from "react";
import { UseMediaStreamResult } from "./use-media-stream-mux";

export function useWebcam(): UseMediaStreamResult {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleStreamEnded = () => {
      setIsStreaming(false);
      setStream(null);
      setError(null);
    };

    if (stream) {
      stream.getTracks().forEach((track) => {
        track.addEventListener("ended", handleStreamEnded);
        // Add error handling for tracks
        track.onmute = () => {
          console.log('Track muted:', track.label);
        };
        track.onunmute = () => {
          console.log('Track unmuted:', track.label);
        };
      });

      return () => {
        stream.getTracks().forEach((track) => {
          track.removeEventListener("ended", handleStreamEnded);
          track.onmute = null;
          track.onunmute = null;
        });
      };
    }
  }, [stream]);

  const start = async () => {
    try {
      // Check if we already have permissions
      const permissions = await navigator.permissions.query({ name: 'camera' as PermissionName });
      
      if (permissions.state === 'denied') {
        throw new Error('Camera permission denied');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        }
      });

      if (!mediaStream || !mediaStream.active) {
        throw new Error('Failed to get active media stream');
      }

      setStream(mediaStream);
      setIsStreaming(true);
      setError(null);
      return mediaStream;
    } catch (err) {
      console.error('Error starting webcam:', err);
      setError(err as Error);
      setIsStreaming(false);
      setStream(null);
      throw err;
    }
  };

  const stop = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
        track.onmute = null;
        track.onunmute = null;
      });
      setStream(null);
      setIsStreaming(false);
      setError(null);
    }
  };

  const result: UseMediaStreamResult = {
    type: "webcam",
    start,
    stop,
    isStreaming,
    stream,
    error
  };

  return result;
}
