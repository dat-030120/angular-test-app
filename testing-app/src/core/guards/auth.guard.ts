import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuardFn = () => {
  const router =inject(Router)
  if (
    !localStorage.getItem('access_token')
  ) {
    localStorage.clear();
    router.navigate(['/login']);
    return false;
  }
  return true;
};
