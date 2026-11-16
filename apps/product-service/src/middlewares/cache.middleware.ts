import { Request, Response, NextFunction } from 'express';
import { redisService } from '../services/redis.service';

type ResponseCache = {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<void>;
};

export function createCacheMiddleware(cache: ResponseCache) {
  return (key: string, ttl?: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const cacheKey = `product:${key}:${req.params.id || req.query.q || 'all'}`;
        const cachedData = await cache.get(cacheKey);

        if (cachedData) {
          console.log('Cache hit for:', cacheKey);
          return res.json(JSON.parse(cachedData));
        }
        console.log('Cache miss for:', cacheKey);
        const originalSend = res.json;

        res.json = function (data) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            void cache.set(cacheKey, JSON.stringify(data), ttl);
          }
          return originalSend.call(this, data);
        };

        next();
      } catch (error) {
        console.error('Cache middleware error:', error);
        next();
      }
    };
  };
}

export const cacheMiddleware = createCacheMiddleware(redisService);

export const clearCache = async (pattern: string) => {
  await redisService.delPattern(pattern);
};
