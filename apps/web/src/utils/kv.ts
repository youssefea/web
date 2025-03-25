import Redis from 'ioredis';
import { isDevelopment } from 'apps/web/src/constants';
import { logger } from './logger';

/**
 * Provides a limited, type-safe interface to Redis operations.
 * Intentionally restricts access to dangerous commands and raw client operations.
 */
class KVManager {
  private client: Redis | null = null;

  private async getClient(): Promise<Redis> {
    if (!this.client) {
      this.client = new Redis(
        String(isDevelopment ? process.env.KV_URL_DEVELOPMENT : process.env.REDIS_URL),
      );
    }

    try {
      await this.client.ping();
    } catch (err) {
      if (!isDevelopment) {
        logger.error('KV connection failed', err);
      }
      console.error(err);
      throw err;
    }

    return this.client;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const client = await this.getClient();
      const value = await client.get(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (err) {
      if (!isDevelopment) {
        logger.error('Failed to get key', err);
      }
      console.error(err);
      throw err;
    }
  }

  async set<T>(
    key: string,
    value: T,
    options?: {
      ex?: number;
      nx?: boolean;
    },
  ) {
    try {
      const client = await this.getClient();
      const stringifiedValue = JSON.stringify(value);

      if (!options) {
        return await client.set(key, stringifiedValue);
      }
      if (options.ex && options.nx) {
        return await client.set(key, stringifiedValue, 'EX', options.ex, 'NX');
      }
      if (options.nx) {
        return await client.set(key, stringifiedValue, 'NX');
      }
      if (options.ex) {
        return await client.set(key, stringifiedValue, 'EX', options.ex);
      }
    } catch (err) {
      if (!isDevelopment) {
        logger.error('Failed to set key', err);
      }
      console.error(err);
      throw err;
    }
  }

  async incr(key: string) {
    try {
      const client = await this.getClient();
      const result = await client.incr(key);
      return result;
    } catch (err) {
      if (!isDevelopment) {
        logger.error('Failed to increment key', err);
      }
      console.error(err);
      throw err;
    }
  }
}

export const kv = new KVManager();
