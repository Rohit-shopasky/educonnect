
import { IStaffReq } from "../model/dto/staffDTO";
import { StaffService } from "../service/staffService";
import { MessageUtil } from "../utils/message";
import { StaffValidator } from "../utils/validators/staffValidator";

export class StaffController extends StaffService {
  private validator: StaffValidator;
  constructor() {
    super();
    this.validator = new StaffValidator();
  }

  /**
   * Create class
   * @param {*} event
   */
  async createStaffController(req: any): Promise<any> {
    const params: IStaffReq = req.body;
    try {
       this.validator.validateStaff(params);
      const result = await this.createStaffService(params);
      return MessageUtil.success(result, 200);
    } catch (err: any) {
      throw err;
    }
  }
}
