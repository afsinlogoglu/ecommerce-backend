import { Request, Response, NextFunction } from 'express';
import { redisService } from '../services/redis.service';

export const cacheMiddleware = (key: string, ttl?: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cacheKey = `product:${key}:${req.params.id || req.query.q || 'all'}`;
      const cachedData = await redisService.get(cacheKey);
      
      if (cachedData) {
        console.log('Cache hit for:', cacheKey);
        return res.json(JSON.parse(cachedData));
      }
      console.log('Cache miss for:', cacheKey);
      // Store original send method
      const originalSend = res.json;
      
      // Override send method to cache response
      res.json = function(data) {
        redisService.set(cacheKey, JSON.stringify(data), ttl);
        return originalSend.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

export const clearCache = async (pattern: string) => {
  await redisService.delPattern(pattern);
};