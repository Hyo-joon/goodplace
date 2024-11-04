"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const passport_1 = require("@nestjs/passport");
const client_s3_1 = require("@aws-sdk/client-s3");
const platform_express_1 = require("@nestjs/platform-express");
const common_1 = require("@nestjs/common");
const constants_1 = require("../@common/constants");
const utils_1 = require("../@common/utils");
let ImageController = class ImageController {
    async uploadImages(files) {
        const s3Client = new client_s3_1.S3Client({
            region: process.env.AWS_BUCKET_REGION,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            },
        });
        const uuid = Date.now();
        const uploadPromises = files.map((file) => {
            const fileName = (0, utils_1.getUniqueFileName)(file, uuid);
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `original/${fileName}`,
                Body: file.buffer,
            };
            const command = new client_s3_1.PutObjectCommand(uploadParams);
            return s3Client.send(command);
        });
        await Promise.all(uploadPromises);
        const uris = files.map((file) => {
            const fileName = (0, utils_1.getUniqueFileName)(file, uuid);
            return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/original/${fileName}`;
        });
        return uris;
    }
};
exports.ImageController = ImageController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', constants_1.numbers.MAX_IMAGE_COUNT, {
        limits: { fileSize: constants_1.numbers.MAX_IMAGE_SIZE },
    })),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "uploadImages", null);
exports.ImageController = ImageController = __decorate([
    (0, common_1.Controller)('images'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)())
], ImageController);
//# sourceMappingURL=image.controller.js.map