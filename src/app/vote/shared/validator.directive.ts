import { Directive } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import { Candidate } from '../model/candidate';
import { User } from '../../user/model/user';
import { Department } from '../../user/model/department';

@Directive({
  selector: '[appValidator]'
})
export class ValidatorDirective {

  constructor() { }

}

export function timeCheckValidator(startTime: Date, endTime: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const nowTime = new Date();

    if (nowTime < startTime) {
      return { 'unopened': true };
    }
    if (nowTime > endTime) {
      return { 'closed': true };
    }

    // console.log(startTime + "<" + nowTime + "<" + endTime);
    return null;
  };
}

export function departmentMatchValidator(targetUser: User): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const matchtdid = [13, 14, 15, 16, 17, 18, 19, 20];
    let targetDepartment: Department;

    if ((targetUser != null) && (targetUser.department != null)) {
      if ((targetUser.account === 'fandylee') ||
          (targetUser.account === 'marcus11') ||
          (targetUser.account === 'wti0902')) {
        return { 'nomatch': true };
      }

      if ((targetUser.account === 'H8382600') ||
          (targetUser.account === 'wxtoya')) {
        return null;
      }

      if (targetUser.role !== 'Formal') {
        return { 'nomatch': true };
      }

      targetDepartment = targetUser.department;
      if (targetDepartment.tiid !== 2) {
        return { 'nomatch': true };
      }

      if ((matchtdid.indexOf(targetDepartment.tdid) === -1) &&
          (matchtdid.indexOf(targetDepartment.parent_tdid) === -1)) {
        return { 'nomatch': true };
      }
    }

    return null;
  };
}

export function candidateMatchValidator(candidates: Candidate[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if (candidates != null) {
      for (const candidate of candidates) {
        if (candidate.candidate === control.value) {
          return null;
        }
      }

      return { 'nomatch': true };
    }
  };
}
