import {LevelRepository, PrizeRepository, UserDataRepository, UserLevelsRepository} from "../repository";
import {LevelModel, PrizeModel, UserDataModel, UserLevelModel, UserModel} from "../models";
import {EventHelper} from "../helpers/event.helper";
import {AuthProvider} from "../providers";
import {PrizeService} from "./prize.service";

export class UserDataService {
    private eventHelper: EventHelper;
    private oldAmount: number = 0;
    private levels: LevelModel[] = [];

    constructor() {
        this.eventHelper = new EventHelper();
    }

    async processUserData(userData: UserDataModel): Promise<void> {
        const {phone, amount} = userData;
        const month: string = this.getCurrentMonth();
        this.levels = await LevelRepository.getAllLevels();
        const phoneExists: boolean = await UserDataRepository.checkPhoneExists(phone, month);
        if (phoneExists) {
            await this.updateUserData(phone, amount, month);
        } else {
            await this.createUserData(phone, amount, month);
        }
        await this.processUserLevels(phone, month);
    }

    getCurrentMonth(): string {
        const now: Date = new Date();
        const year: number = now.getFullYear();
        const month: string = String(now.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    }

    private async processUserLevels(phone: number, month: string): Promise<void> {
        const user: UserDataModel = await UserDataRepository.getUserDataByPhoneAndMonth(phone, month);
        const levels: LevelModel[] = await LevelRepository.getLevelsByUserData({
            amount: user.amount,
            oldAmount: this.oldAmount
        });
        const fullPhone: number = this.addCountryCode(phone);
        const newUser: UserModel | null = await AuthProvider.getPhone(fullPhone);
        if (!newUser) {
            throw new Error('User not found');
        }

        const newLevelsData: LevelModel[] = [];
        const newPrizes: number[] = [];
        const newLevels: UserLevelModel[] = levels.map(level => {
            newLevelsData.push(level);
            newPrizes.push(level.prize_id);
            return {
                phone,
                level_id: level.id,
                month: this.getCurrentMonth()
            };
        });
        if (newPrizes.length !== 0) {
            const prizes: PrizeModel[] = await PrizeRepository.getWhereIdInArray(newPrizes);
            for (let prize of prizes) {
                await PrizeService.assignByLevels(prize, newUser, newLevelsData[0].id);
                const prizeData: PrizeModel = await PrizeRepository.getOne(newLevelsData[0].prize_id);
                await this.eventHelper.levelCompleted(newUser, newLevelsData[0], prizeData);
            }
        }

        if (newLevels.length > 0) {
            await UserLevelsRepository.insertUserLevels(newLevels);
        }
    }

    private async updateUserData(phone: number, amount: number, month: string): Promise<void> {
        const levels: LevelModel[] = this.levels;
        let currentLevelId: number | null = null;
        const fullPhone: number = this.addCountryCode(phone);
        const newUser: UserModel | null = await AuthProvider.getPhone(fullPhone);
        if (!newUser) {
            throw new Error('User not found');
        }
        const user: UserDataModel = await UserDataRepository.getUserDataByPhoneAndMonth(phone, month);
        this.oldAmount = user.amount;
        amount += user.amount;
        for (const level of levels) {
            if (amount >= level.limit) {
                currentLevelId = level.id;
                if (amount === level.limit) {
                    break;
                }
            }

            let halfAmount: number = Math.round(level.limit / 2);
            if (this.oldAmount < halfAmount && amount > halfAmount && amount < level.limit) {
                await this.eventHelper.levelHalf(newUser, level);
            }
        }
        await UserDataRepository.updateUserData(phone, amount, month, currentLevelId);
    }

    private async createUserData(phone: number, amount: number, month: string): Promise<void> {
        const levels: LevelModel[] = this.levels;
        let currentLevelId: number | null = null;
        const fullPhone: number = this.addCountryCode(phone);
        const user: UserModel | null = await AuthProvider.getPhone(fullPhone);
        if (!user) {
            throw new Error('User not found');
        }
        await this.eventHelper.newStarter(user);
        for (let level of levels) {
            if (amount >= level.limit) {
                currentLevelId = level.id;
                if (amount === level.limit) {
                    break;
                }
            }
            let halfAmount: number = Math.round(level.limit / 2);
            if (this.oldAmount < halfAmount && amount > halfAmount && amount < level.limit) {
                await this.eventHelper.levelHalf(user, level);
            }
        }
        await UserDataRepository.insertUserData(phone, amount, month, currentLevelId);
    }

    private addCountryCode(phone: number): number {
        const countryCode = 998;
        const phoneStr = phone.toString();
        const fullPhoneStr = countryCode.toString() + phoneStr;
        return Number(fullPhoneStr);
    }
}