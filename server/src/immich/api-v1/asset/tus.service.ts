import { StorageCore, StorageFolder } from '@app/domain';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { FileStore } from '@tus/file-store';
import { EVENTS, Server } from '@tus/server';
import { IncomingMessage, ServerResponse } from 'http';
import { randomBytes } from 'node:crypto';
import { join } from 'node:path';

@Injectable()
export class TusService implements OnModuleInit {
  private logger = new Logger('TusService');

  private tusServers: Record<string, Server> = {};

  onModuleInit() {
    this.logger.log('Initializing Tus Server');
  }

  getServer(userId: string, onCreation: (server: Server) => void) {
    if (!(userId in this.tusServers)) {
      this.initializeTusServer(userId);
      onCreation(this.tusServers[userId]);
    }

    return this.tusServers[userId];
  }

  async handleTus(req: IncomingMessage, res: ServerResponse<IncomingMessage>, userId: string) {
    if (!(userId in this.tusServers)) {
      this.initializeTusServer(userId);
    }

    this.tusServers[userId].handle(req, res);
    return this.tusServers[userId];
  }

  private initializeTusServer(userId: string) {
    this.logger.log(`Init tus server for user ${userId}`);
    this.tusServers[userId] = new Server({
      // For some reason, without the ../.., tus sends a Location header with
      // http://host:2283/asset/upload-tus/api/asset/upload-tus, which is wrong
      // The relative path like this solves the issue
      path: `/../../api/asset/upload-tus`,
      datastore: new FileStore({
        directory: join(StorageCore.getBaseFolder(StorageFolder.TUS_PARTIAL), userId),
      }),
      namingFunction: (req: IncomingMessage) => {
        let uploadMeta = req.headersDistinct['upload-metadata']; // Lowercase
        const metadata: Record<string, string> = {};

        if (uploadMeta === undefined) {
          return randomBytes(16).toString('hex');
        } else {
          uploadMeta[0].split(',').map((item) => {
            const tmp = item.split(' ');
            const key = tmp[0];
            const value = Buffer.from(tmp[1], 'base64').toString('ascii');
            metadata[key] = value;
          });
        }

        const extension = metadata['filename'].split('.').pop();

        return randomBytes(16).toString('hex') + '.' + extension;
      },
    });

    this.tusServers[userId].on(EVENTS.POST_FINISH, (req, res, upload) => {
      this.logger.log(`Upload complete for file ${JSON.stringify(upload)} and server ${userId}`);
    });
  }
}
