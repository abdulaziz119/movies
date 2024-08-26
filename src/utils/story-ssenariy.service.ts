import {
  daysPassedSince,
  ErrorEnum,
  formatDate,
  PrizeRepository,
  SsenariyRepository,
  StorySsenariyModel,
  StorySsenariyRepository,
  StorySsenariyWithRelationModel
} from "..";
import {UNPROCESSABLE_ENTITY} from "http-status-codes";
import {ValidationException} from "../exceptions/validation.exception";
import {PrizeService} from "./prize.service";
import {DayStatusEnum} from "../models/enums/day-status.enum";
import {NotFoundException} from "../exceptions/not-found.exception";
import {EventHelper} from "./event.helper";

export class StorySsenariyService {
  static async getOrFailstorySsenariy(user_id: number): Promise<StorySsenariyWithRelationModel> {
    const ssenaries = await SsenariyRepository.getCalendarSsenaries()

    if (!ssenaries[0]) {
      throw new ValidationException(ErrorEnum.noActiveSsenaries, UNPROCESSABLE_ENTITY)
    }

    let result: StorySsenariyModel = await StorySsenariyRepository.getOrderBySsenariyPosition({
      ssenariy_ids: ssenaries.map(i => i.id),
      user_id: user_id
    })

    if (!result) {
      throw new NotFoundException(ErrorEnum.NotFound)
    }

    let ss: StorySsenariyWithRelationModel = {
      ...result,
      ssenariy: ssenaries.filter(ssenariy => ssenariy.id === result.ssenariy_id)[0]
    }

    if (!ss.ssenariy.prize_id) {
      throw Error('Prize id is null. Ssenariy - ' + JSON.stringify(ss.ssenariy))
    }

    ss.ssenariy.prize = await PrizeRepository.getOne(ss.ssenariy.prize_id)

    return ss
  }

  static async getActiveStorySsenariy(user_id: number): Promise<StorySsenariyWithRelationModel> {
    const ssenaries = await SsenariyRepository.getCalendarSsenaries()

    if (!ssenaries[0]) {
      throw new ValidationException(ErrorEnum.noActiveSsenaries, UNPROCESSABLE_ENTITY)
    }

    let result: StorySsenariyModel = await StorySsenariyRepository.getOrderBySsenariyPosition({
      ssenariy_ids: ssenaries.map(i => i.id),
      user_id: user_id
    })

    if (!result || (result.completed_at && formatDate(result.completed_at) !== formatDate(new Date()))) {
      let nextSsenariy

      if (result) {
        let ssenariy = ssenaries.filter(item => item.id === result.ssenariy_id)[0]
        nextSsenariy = ssenaries.filter(item => item.position > ssenariy.position)[0]
      } else {
        nextSsenariy = ssenaries[0]
      }

      if (nextSsenariy) {
        result = await StorySsenariyRepository.create({
          user_id: user_id,
          ssenariy_id: nextSsenariy.id,
          date_start: new Date(),
          days: [],
          completed_at: null
        })
      }
    }

    let ss: StorySsenariyWithRelationModel = {
      ...result,
      ssenariy: ssenaries.filter(ssenariy => ssenariy.id === result.ssenariy_id)[0]
    }

    if (!ss.ssenariy.prize_id) {
      throw Error('Prize id is null. Ssenariy - ' + JSON.stringify(ss.ssenariy))
    }

    ss.ssenariy.prize = await PrizeRepository.getOne(ss.ssenariy.prize_id ?? 0)

    return ss
  }

  static async handleDays(storySsenariy: StorySsenariyWithRelationModel, condition: boolean): Promise<StorySsenariyModel> {
    if (storySsenariy.completed_at) {
      return storySsenariy
    }

    let daysPassed = daysPassedSince(storySsenariy.date_start ?? new Date())

    let isUpdateable: boolean = false;

    const days = storySsenariy.days.map((day) => day.serial_number)

    for (let i = 0; i <= daysPassed; i++) {
      let serialNumber = i + 1;
      if (daysPassed > i) { // if any day skipped in past
        if (!days.includes(serialNumber) || !storySsenariy.days[i].condition) {
          storySsenariy.days = [{
            serial_number: 1,
            condition: condition
          }]
          storySsenariy.date_start = new Date

          isUpdateable = true

          await EventHelper.streakReset(storySsenariy)

          break
        }
      } else if (!days.includes(serialNumber)) { // add today
        isUpdateable = true

        storySsenariy.days.push({
          serial_number: serialNumber,
          condition: condition
        })
        await EventHelper.streakSuccess(storySsenariy)

        if (serialNumber === storySsenariy.ssenariy.days && condition) {
          storySsenariy.completed_at = new Date
        }
      } else if (days.includes(serialNumber) && !storySsenariy.days[i].condition) {
        storySsenariy.days[i].condition = condition
        isUpdateable = true
        await EventHelper.streakSuccess(storySsenariy)

        if (serialNumber === storySsenariy.ssenariy.days && condition) {
          storySsenariy.completed_at = new Date
        }
      }
    }

    if (storySsenariy.completed_at) {
      try {
        await PrizeService.assignByStorySsenariy(storySsenariy)
      } catch (error) {
        console.log('PrizeService.assign failed', error)
      }
    }

    if (isUpdateable) {
      let result = await StorySsenariyRepository.update(storySsenariy);
      storySsenariy = {
        ...result,
        ssenariy: storySsenariy.ssenariy
      }
    }

    return storySsenariy
  }

  static getForFrontend(ss: StorySsenariyWithRelationModel, language: string) {

    let days: any[] = []

    let daysPassed = 0

    for (let i = 1; i < (ss.ssenariy.days + 1); i++) {

      let status = DayStatusEnum.empty

      let day = ss.days.filter(day => day.serial_number === i)[0]

      if (day) {
        status = day.condition ? DayStatusEnum.checked : DayStatusEnum.unchecked
      } else {
        status = DayStatusEnum.empty
      }

      if (status === DayStatusEnum.checked) {
        daysPassed++
      }

      if (i === ss.ssenariy.days) {
        status = DayStatusEnum.prize
      }

      days.push({
        index: i,
        status: status
      })
    }

    return {
      is_completed: daysPassed === ss.ssenariy.days,
      days_passed: daysPassed,
      days: days,
      prize: {
        id: ss.ssenariy.prize.id,
        name: ss.ssenariy.prize.name[language],
        type: ss.ssenariy.prize.type,
        value: ss.ssenariy.prize.value,
        created_at: ss.ssenariy.prize.created_at,
        updated_at: ss.ssenariy.prize.updated_at
      }
    }
  }
}