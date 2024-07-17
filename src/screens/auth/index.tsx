export const emailValidator = (email: string): boolean => {
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
	if (reg.test(email) === false) {
		return false;
	}
	return true;
};

export const passwordValidator = (char: string) => {
	if (char.length > 4) {
		return true;
	} else {
		return false;
	}
};

export const emailCodeChecker = (value: string) => {
	if (value.length > 4) {
		return true;
	} else {
		return false;
	}
};
