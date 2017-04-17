/**
 * Created by Blow on 2017-04-05.
 */
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController, AlertController, PopoverController, Popover } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { CourseModel } from '../../entities/CourseModel';
import { UserService } from "../../providers/user.Service";
//Todo:将选课篮数据加入缓存
@Component({
	selector: 'page-choose-course',
	templateUrl: 'choose-course.html'
})
export class ChooseCoursePage extends AbstractComponent implements OnInit {
	model: Array<CourseModel> = [];
	// 选课验证码地址
	validate: any;
	// 选课验证码
	validateCode: any;
	// 课程代码
	courseId:string;
	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected alertCtrl: AlertController,
		protected popCtrl: PopoverController,
		protected cfg: AppConfig,
		protected userSvc: UserService
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl, null, alertCtrl);
	}
	ngOnInit() {
		// this.model.push(new CourseModel("2017000001", false));
		console.log('Hello,选课');
	}

	getToChooseCourse() {
		// console.log(this.model);
		return this.model.filter(item => !item.done);
	}

	addItem(newItem) {
		let reg = /^201\d[1-2][0-9A-Z]\d{4}$/g;
		if (!reg.test(newItem)) {
			this.showMessage("请输入正确的教学班代码格式~");
			return;
		}
		if (newItem != "") {
			this.model.push(new CourseModel(newItem, false));
		}
		console.log(this.model);
	}

	getValidate(course): any {
		this.courseId = course;
		this.userSvc.userChooseCourseValidate().subscribe((u) => {
			this.validate = u;
			// this.showPopover();
		},
			er => {
				this.showMessage('获取验证码失败');
				if (er.status === 401) {
					this.navCtrl.pop();
					this.showMessage('登录失效,请重新登录', 'middle');
				}
				console.log(er);
			})
	}

	chooseSingleCourse(course): any {

		this.userSvc.userChooseCourse(course, this.validate).subscribe(u => {
			if (u.Result) {
				this.showMessage(u.Result);
			}
			console.log(u);
		}, er => {
			this.showMessage('选课失败' + er.message);

			console.log(er);
		})
	}
}


