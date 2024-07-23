import { IClass } from "../model/dto/classDTO";
import { ClassesService } from "../service/classesService";
import { MessageUtil } from "../utils/message";
import { ClassValidator } from "../utils/validators/classValidator";

export class ClassController extends ClassesService {
  private validator: ClassValidator;
  constructor() {
    super();
    this.validator = new ClassValidator();
  }

  /**
   * Create class
   * @param {*} event
   */
  async createClassController(req: any): Promise<any> {
    const params: IClass = req.body;
    try {
      this.validator.validateClass(params);
      const result = await this.createClassService(params);
      return MessageUtil.success(result, 200);
    } catch (err: any) {
      throw err;
    }
  }
}
