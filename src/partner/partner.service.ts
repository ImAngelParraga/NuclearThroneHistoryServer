import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';
import { getPartnerCollectionPath } from 'src/firestore/firestorePaths';
import * as crypto from 'crypto';

export interface IPartnerService {
    getPartners(): Partner[]
    checkSecretKeyForPartner(partnerId: string, secretKeyProvided: string): boolean
}

export class Partner {
    constructor(
        public partnerId: string,
        public secretKey: string
    ) { }
}

@Injectable()
export class PartnerService implements IPartnerService, OnModuleInit {
    constructor(
        private readonly firestoreService: FirestoreService
    ) { }

    private partners: Map<string, Partner> = new Map()

    async onModuleInit(): Promise<void> {
        await this.updatePartnerListFromDB();
    }

    getPartners(): Partner[] {
        return Array.from(this.partners.values())
    }

    checkSecretKeyForPartner(partnerId: string, secretKeyProvided: string): boolean {
        const partner = this.partners.get(partnerId)
        if (partner == undefined) {
            throw new NotFoundException("Partner id not found.")
        }

        const sha256Hash = crypto.createHash('sha256');
        sha256Hash.update(partner.secretKey)
        const secretKeyEncoded = sha256Hash.digest('hex')

        return secretKeyProvided == secretKeyEncoded
    }

    private async updatePartnerListFromDB() {
        this.partners.clear()
        const rawDocs = await this.firestoreService.getCollection(getPartnerCollectionPath)
        rawDocs.forEach((doc) => {
            this.partners.set(doc.partnerId, new Partner(doc.partnerId, doc.secretKey))
        })
    }
}
