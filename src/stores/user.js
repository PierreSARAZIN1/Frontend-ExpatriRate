import { atom } from 'jotai';
import Cookies from 'js-cookie'

export const userIdAtom = atom(Cookies.get('id') ? Cookies.get('id') : "");
export const jwtAtom = atom(Cookies.get('token') ? Cookies.get('token') : "");