import { BadRequestException, HttpException, HttpStatus, NotFoundException } from "@nestjs/common"

export class RunNotFounException extends NotFoundException {
    constructor() {
        super('Run was not found')
    }
}

export class RunConflictException extends HttpException {
    constructor() {
        super('Run already exists', HttpStatus.CONFLICT)
    }
}

export class SteamIdNotProvidedException extends BadRequestException {
    constructor() {
        super('Steam id was not provided.')
    }
}

export class KeyNotProvidedException extends BadRequestException {
    constructor() {
        super('Key was not provided.')
    }
}

export class PartnerIdNotProvidedException extends BadRequestException {
    constructor() {
        super('Partner ID was not provided.')
    }
}

export class AuthorizationNotProvidedException extends BadRequestException {
    constructor() {
        super('Authorization header was not provided.')
    }
}