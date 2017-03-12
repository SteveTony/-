import { Injectable } from '@angular/core';
// import { Promise } from 'es6-promise';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { AbstractService } from "../interfaces/abstract-service";
import { UserInfor } from "../Entities/UserInfor";
import { CourseData } from "../Entities/CourseData";
//import {HttpDataService} from "./httpData.service";
import { AbstractDataService } from "../interfaces/abstract.data.service";
import { AppConfig } from "../app/app.config";
// import { AppRouter, ActionLinks } from '../app/app.routes.module';
/*
用户服务
 */
@Injectable()
export class UserService extends AbstractService {

    constructor(private dataService: AbstractDataService, cfg: AppConfig) {
        super(dataService, cfg); // constructors in derived classes must call super()

    }

    /**
     * 用户登录
     * @param userName
     * @param password
     * @returns {Observable<any>}
     */
    userUrpValidate(): Observable<any> {
        // var data = peopleId;
        var res = this.dataSvc.getData('v5api/api/GetLoginCaptchaInfo/d172a5d9-8df0-4983-91a3-db6bb47855bc', null);
        console.log(res);
        return res;
    }

    userUrpLogin(validate: string, temp: string, username: string, password: string): Observable<any> {
        var n = `grant_type=password&username=${username}&password=${password}%7C${validate}*${temp}&client_id=ynumisSite`;
        var res = this.dataSvc.postData(`v5api/OAuth/Token`, n)
        console.log(res);
        return res;
    }

    userUrpGrade(token: string): Observable<any> {
        this.cfg.config.urpToken = token;
        console.log(this.cfg.config.urpToken);
        var res = this.dataSvc.getData('v5api/api/Result', null);
        console.log(res);
        return res;
    }

    static user: Array<UserInfor> = [
        new UserInfor('', '', 0, '', 0, false),
        // {id:"",name:"",similar:0,className:"",grade:0,status:false}
    ];

    /**
  * 获取首次用户信息
  */
    loadUserData(): Observable<UserInfor[]> {
        return Observable.of(
            UserService.user
        );
    }


}