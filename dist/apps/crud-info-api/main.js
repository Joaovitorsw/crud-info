/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/crud-info-api/src/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const serve_static_1 = __webpack_require__("@nestjs/serve-static");
const path_1 = __webpack_require__("path");
const auth_1 = __webpack_require__("./apps/crud-info-api/src/domain/auth/index.ts");
const prisma_1 = __webpack_require__("./apps/crud-info-api/src/domain/prisma/index.ts");
const vehicle_module_1 = __webpack_require__("./apps/crud-info-api/src/domain/vehicle/vehicle.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            prisma_1.PrismaModule,
            vehicle_module_1.VehicleModule,
            auth_1.AuthModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'crud-info'),
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const runtime_1 = __webpack_require__("@prisma/client/runtime");
const auth_service_1 = __webpack_require__("./apps/crud-info-api/src/domain/auth/auth.service.ts");
const sign_in_dto_1 = __webpack_require__("./apps/crud-info-api/src/domain/auth/dtos/sign-in.dto.ts");
const sign_up_dto_1 = __webpack_require__("./apps/crud-info-api/src/domain/auth/dtos/sign-up.dto.ts");
const auth_enum_1 = __webpack_require__("./apps/crud-info-api/src/domain/auth/models/auth.enum.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(signUpRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.authService.signUp(signUpRequest);
                const user = this.authService.currentUser();
                return Object.assign(Object.assign({}, token), user);
            }
            catch (error) {
                if (error instanceof runtime_1.PrismaClientKnownRequestError)
                    throw new common_1.HttpException(auth_enum_1.eAuthMessage.EMAIL_ALREADY_EXISTS, common_1.HttpStatus.BAD_REQUEST);
                throw error;
            }
        });
    }
    signIn(signInRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const token = yield this.authService.signIn(signInRequest);
            const user = this.authService.currentUser();
            return Object.assign(Object.assign({}, token), user);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('sign-up'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof sign_up_dto_1.SignUpRequestDto !== "undefined" && sign_up_dto_1.SignUpRequestDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AuthController.prototype, "signUp", null);
tslib_1.__decorate([
    (0, common_1.Post)('sign-in'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof sign_in_dto_1.SignInRequestDto !== "undefined" && sign_in_dto_1.SignInRequestDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "signIn", null);
AuthController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Autenticação'),
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _e : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/auth.error.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnauthenticatedUserError = void 0;
class UnauthenticatedUserError extends Error {
    constructor() {
        super('Unauthenticated');
    }
}
exports.UnauthenticatedUserError = UnauthenticatedUserError;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const prisma_1 = __webpack_require__("./apps/crud-info-api/src/domain/prisma/index.ts");
const auth_controller_1 = __webpack_require__("./apps/crud-info-api/src/domain/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__("./apps/crud-info-api/src/domain/auth/auth.service.ts");
const strategies_1 = __webpack_require__("./apps/crud-info-api/src/domain/auth/strategies/index.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, jwt_1.JwtModule.register({})],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, strategies_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const argon = __webpack_require__("argon2");
const prisma_1 = __webpack_require__("./apps/crud-info-api/src/domain/prisma/index.ts");
const auth_enum_1 = __webpack_require__("./apps/crud-info-api/src/domain/auth/models/auth.enum.ts");
let AuthService = class AuthService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    signIn(userRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.prismaService.user.findUnique({
                where: {
                    email: userRequest.email,
                },
            });
            if (!user)
                throw new common_1.HttpException(auth_enum_1.eAuthMessage.INVALID_CREDENTIALS, common_1.HttpStatus.UNAUTHORIZED);
            const passwordMatches = yield argon.verify(user.password, userRequest.password);
            if (!passwordMatches)
                throw new common_1.HttpException(auth_enum_1.eAuthMessage.INVALID_CREDENTIALS, common_1.HttpStatus.UNAUTHORIZED);
            const responseUser = {
                userID: user.userID,
                name: user.name,
                email: user.email,
            };
            this.responseUser = responseUser;
            const token = yield this.generateToken(responseUser);
            return token;
        });
    }
    currentUser() {
        return this.responseUser;
    }
    signUp(userRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.createUser(userRequest);
            const token = yield this.generateToken(user);
            return token;
        });
    }
    createUser(userRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield argon.hash(userRequest.password);
            const user = yield this.prismaService.user.create({
                data: {
                    name: userRequest.name,
                    email: userRequest.email,
                    password: passwordHash,
                },
                select: {
                    userID: true,
                    email: true,
                    name: true,
                },
            });
            this.responseUser = user;
            return user;
        });
    }
    generateToken(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = {
                userID: user.userID,
                email: user.email,
                name: user.name,
            };
            const token = yield this.jwtService.signAsync(payload, {
                expiresIn: '1h',
                secret: process.env.JWT_SECRET,
            });
            return { accessToken: token };
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/dtos/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/dtos/sign-in.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/dtos/sign-up.dto.ts"), exports);


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/dtos/sign-in.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInRequestDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_validator_1 = __webpack_require__("class-validator");
class SignInRequestDto {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'O email do usuário',
        default: 'joaovitorsw@teste.com',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], SignInRequestDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A senha do usuário',
        default: '123456',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    tslib_1.__metadata("design:type", String)
], SignInRequestDto.prototype, "password", void 0);
exports.SignInRequestDto = SignInRequestDto;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/dtos/sign-up.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignUpRequestDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_validator_1 = __webpack_require__("class-validator");
class SignUpRequestDto {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'O nome do usuário a ser criado',
        default: 'João Vitor',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    tslib_1.__metadata("design:type", String)
], SignUpRequestDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'O email do usuário a ser criado',
        default: 'joaovitorsw@teste.com',
    }),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], SignUpRequestDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A senha do usuário a ser criada',
        default: '123456',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    tslib_1.__metadata("design:type", String)
], SignUpRequestDto.prototype, "password", void 0);
exports.SignUpRequestDto = SignUpRequestDto;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/guards/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/guards/jwt.guard.ts"), exports);


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/guards/jwt.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtGuard = void 0;
const passport_1 = __webpack_require__("@nestjs/passport");
class JwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
    }
}
exports.JwtGuard = JwtGuard;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/auth.controller.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/auth.error.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/guards/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/dtos/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/strategies/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/auth.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/auth.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/strategies/index.ts"), exports);


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/models/auth.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.eAuthMessage = void 0;
var eAuthMessage;
(function (eAuthMessage) {
    eAuthMessage["INVALID_CREDENTIALS"] = "Usu\u00E1rio ou senha inv\u00E1lidos";
    eAuthMessage["EMAIL_ALREADY_EXISTS"] = "Email j\u00E1 cadastrado";
})(eAuthMessage = exports.eAuthMessage || (exports.eAuthMessage = {}));


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/strategies/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/auth/strategies/jwt.strategy.ts"), exports);


/***/ }),

/***/ "./apps/crud-info-api/src/domain/auth/strategies/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const prisma_1 = __webpack_require__("./apps/crud-info-api/src/domain/prisma/index.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(prismaService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
        this.prismaService = prismaService;
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.prismaService.user.findUnique({
                where: {
                    userID: payload.userID,
                },
            });
            return {
                userID: user.userID,
                username: user.name,
                email: user.email,
            };
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/prisma/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/prisma/prisma.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./apps/crud-info-api/src/domain/prisma/prisma.service.ts"), exports);


/***/ }),

/***/ "./apps/crud-info-api/src/domain/prisma/prisma.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const prisma_service_1 = __webpack_require__("./apps/crud-info-api/src/domain/prisma/prisma.service.ts");
let PrismaModule = class PrismaModule {
};
PrismaModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);
exports.PrismaModule = PrismaModule;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/prisma/prisma.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const client_1 = __webpack_require__("@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            },
        });
    }
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$connect();
        });
    }
    onModuleDestroy() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.$disconnect();
        });
    }
    cleanDataBase() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (false)
                {}
            const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_');
            return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()));
        });
    }
};
PrismaService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], PrismaService);
exports.PrismaService = PrismaService;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/vehicle/dto/vehicle-create.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleResponseDto = exports.VehicleRequestDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_validator_1 = __webpack_require__("class-validator");
class VehicleRequestDto {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'OAX-5895',
        description: 'Essa é a placa do veículo',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleRequestDto.prototype, "board", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: '776046489',
        description: 'Esse é o chassi do veículo',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleRequestDto.prototype, "chassi", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: '9BD15822AC6650210',
        description: 'Esse é o Registro Nacional de um Veículo',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleRequestDto.prototype, "renavam", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Automóvel Branco',
        description: 'Esse é o modelo do veículo',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleRequestDto.prototype, "modelo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Fiat Uno Mille Ec.',
        description: 'Esse é a marca do veículo',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleRequestDto.prototype, "marca", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2011',
        description: 'Esse o ano de fabricação do veículo',
    }),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(4),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleRequestDto.prototype, "ano", void 0);
exports.VehicleRequestDto = VehicleRequestDto;
class VehicleResponseDto {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Esse é  o identificador único de um veículo no banco de dados',
    }),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], VehicleResponseDto.prototype, "vehicleID", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'OAX-5895',
        description: 'Esse é a placa do veículo',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleResponseDto.prototype, "board", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: '9BD15822AC6650210',
        description: 'Esse é o chassi do veículo',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleResponseDto.prototype, "chassi", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: '776046489',
        description: 'Esse é o Registro Nacional de um Veículo',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleResponseDto.prototype, "renavam", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Automóvel Branco',
        description: 'Esse é o modelo do veículo',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleResponseDto.prototype, "modelo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Fiat Uno Mille Ec.',
        description: 'Essa é a marca do veículo',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleResponseDto.prototype, "marca", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2011',
        description: 'Esse é a o ano de fabricação do veículo',
    }),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(6),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VehicleResponseDto.prototype, "ano", void 0);
exports.VehicleResponseDto = VehicleResponseDto;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/vehicle/service/vehicle.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const prisma_1 = __webpack_require__("./apps/crud-info-api/src/domain/prisma/index.ts");
let VehicleService = class VehicleService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(vehicleRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vehicleCreate = yield this.prismaService.vehicle.create({
                data: {
                    board: vehicleRequest.board,
                    chassi: vehicleRequest.chassi,
                    renavam: vehicleRequest.renavam,
                    modelo: vehicleRequest.modelo,
                    marca: vehicleRequest.marca,
                    ano: vehicleRequest.ano,
                    createdAt: new Date(),
                },
            });
            const vehicleResponse = this.createVehicleResponse(vehicleCreate);
            return vehicleResponse;
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vehicles = yield this.prismaService.vehicle.findMany();
            const vehiclesResponse = vehicles.map((vehicle) => this.createVehicleResponse(vehicle));
            return vehiclesResponse;
        });
    }
    findOne(vehicleID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vehicle = yield this.prismaService.vehicle.findUnique({
                where: { vehicleID },
            });
            const vehicleResponse = this.createVehicleResponse(vehicle);
            return vehicleResponse;
        });
    }
    update(vehicleRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vehicleID = vehicleRequest.vehicleID;
            const updateVehicle = yield this.prismaService.vehicle.update({
                where: { vehicleID },
                data: {
                    board: vehicleRequest.board,
                    chassi: vehicleRequest.chassi,
                    renavam: vehicleRequest.renavam,
                    modelo: vehicleRequest.modelo,
                    marca: vehicleRequest.marca,
                    ano: vehicleRequest.ano,
                },
            });
            const vehicleResponse = this.createVehicleResponse(updateVehicle);
            return vehicleResponse;
        });
    }
    delete(vehicleID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.prismaService.vehicle.delete({
                where: { vehicleID },
            });
            return true;
        });
    }
    createVehicleResponse(vehicle) {
        return {
            vehicleID: vehicle.vehicleID,
            board: vehicle.board,
            chassi: vehicle.chassi,
            renavam: vehicle.renavam,
            modelo: vehicle.modelo,
            marca: vehicle.marca,
            ano: vehicle.ano,
        };
    }
};
VehicleService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], VehicleService);
exports.VehicleService = VehicleService;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/vehicle/vehicle.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const unauthenticated_user_dto_1 = __webpack_require__("./apps/crud-info-api/src/shared/models/unauthenticated-user.dto.ts");
const auth_1 = __webpack_require__("./apps/crud-info-api/src/domain/auth/index.ts");
const vehicle_create_dto_1 = __webpack_require__("./apps/crud-info-api/src/domain/vehicle/dto/vehicle-create.dto.ts");
const vehicle_service_1 = __webpack_require__("./apps/crud-info-api/src/domain/vehicle/service/vehicle.service.ts");
let VehicleController = class VehicleController {
    constructor(vehicleService) {
        this.vehicleService = vehicleService;
    }
    getAllVehicle() {
        return this.vehicleService.findAll();
    }
    getVehicleById(vehicleID) {
        return this.vehicleService.findOne(vehicleID);
    }
    createVehicle(vehicleRequestDto) {
        return this.vehicleService.create(vehicleRequestDto);
    }
    updateVehicle(vehicleRequestDto) {
        return this.vehicleService.update(vehicleRequestDto);
    }
    deleteVehicle(vehicleID) {
        return this.vehicleService.delete(vehicleID);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: [vehicle_create_dto_1.VehicleResponseDto],
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], VehicleController.prototype, "getAllVehicle", null);
tslib_1.__decorate([
    (0, common_1.Get)(':vehicleID'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: vehicle_create_dto_1.VehicleResponseDto,
    }),
    tslib_1.__param(0, (0, common_1.Param)('vehicleID')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], VehicleController.prototype, "getVehicleById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: vehicle_create_dto_1.VehicleRequestDto }),
    (0, swagger_1.ApiResponse)({ type: vehicle_create_dto_1.VehicleResponseDto }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof vehicle_create_dto_1.VehicleRequestDto !== "undefined" && vehicle_create_dto_1.VehicleRequestDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], VehicleController.prototype, "createVehicle", null);
tslib_1.__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiBody)({ type: vehicle_create_dto_1.VehicleResponseDto }),
    (0, swagger_1.ApiResponse)({ type: vehicle_create_dto_1.VehicleResponseDto }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof vehicle_create_dto_1.VehicleResponseDto !== "undefined" && vehicle_create_dto_1.VehicleResponseDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], VehicleController.prototype, "updateVehicle", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':vehicleID'),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('vehicleID')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], VehicleController.prototype, "deleteVehicle", null);
VehicleController = tslib_1.__decorate([
    (0, common_1.UseGuards)(auth_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiTags)('Veiculo'),
    (0, common_1.Controller)('vehicle'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        type: unauthenticated_user_dto_1.UnauthenticatedUserResponseDto,
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof vehicle_service_1.VehicleService !== "undefined" && vehicle_service_1.VehicleService) === "function" ? _c : Object])
], VehicleController);
exports.VehicleController = VehicleController;


/***/ }),

/***/ "./apps/crud-info-api/src/domain/vehicle/vehicle.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VehicleModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const vehicle_service_1 = __webpack_require__("./apps/crud-info-api/src/domain/vehicle/service/vehicle.service.ts");
const vehicle_controller_1 = __webpack_require__("./apps/crud-info-api/src/domain/vehicle/vehicle.controller.ts");
let VehicleModule = class VehicleModule {
};
VehicleModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [vehicle_controller_1.VehicleController],
        providers: [
            {
                provide: vehicle_service_1.VehicleService,
                useClass: vehicle_service_1.VehicleService,
            },
        ],
    })
], VehicleModule);
exports.VehicleModule = VehicleModule;


/***/ }),

/***/ "./apps/crud-info-api/src/shared/models/unauthenticated-user.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnauthenticatedUserResponseDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
class UnauthenticatedUserResponseDto {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        default: '401',
    }),
    tslib_1.__metadata("design:type", Number)
], UnauthenticatedUserResponseDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        default: 'Unauthenticated',
    }),
    tslib_1.__metadata("design:type", String)
], UnauthenticatedUserResponseDto.prototype, "message", void 0);
exports.UnauthenticatedUserResponseDto = UnauthenticatedUserResponseDto;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/swagger":
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@prisma/client":
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "@prisma/client/runtime":
/***/ ((module) => {

module.exports = require("@prisma/client/runtime");

/***/ }),

/***/ "argon2":
/***/ ((module) => {

module.exports = require("argon2");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const app_module_1 = __webpack_require__("./apps/crud-info-api/src/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Vehicle Info API')
            .setDescription('Api feita para criação,leitura,atualização e remoção de veículos com autenticação JWT')
            .setVersion('1.0')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        }, 'JWT-auth')
            .build();
        app.enableCors();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        const port = process.env.PORT || 5000;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map