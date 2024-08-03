import { LoginService } from "../service/loginService";
import { ILoginReq } from "../types/interfaces";
import { MessageUtil } from "../utils/message";
import { LoginValidator } from "../utils/validators/loginValidator";

export class LoginController extends LoginService {
   private validator: LoginValidator;
  constructor() {
    super();
    this.validator = new LoginValidator();
  }

  /**
   * login
   * @param {*} event
   */
  async login(req: any): Promise<any> {
    const params: ILoginReq = req.body;
    try {
     await this.validator.validateLogin(params);
      const result = await this.loginService(params);
      return MessageUtil.success(result, 200);
    } catch (err: any) {
      throw err;
    }
  }


  /**
   * login
   * @param {*} event
   */
  async staffLogin(req: any): Promise<any> {
    const params: ILoginReq = req.body;
    try {
     await this.validator.validateLogin(params);
      const result = await this.staffLoginService(params);
      return MessageUtil.success(result, 200);
    } catch (err: any) {
      throw err;
    }
  }
}
