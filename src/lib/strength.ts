export enum Strength {
	TOO_WEAK = 'TOO_WEAK',
	Weak = 'WEAK',
	Medium = 'MEDIUM',
	Strong = 'STRONG',
}

export class StrengthUtil {
	static fromPassword(password: string): Strength {
		if (password.length < 8) {
			return Strength.TOO_WEAK;
		}
		if (password.length < 12) {
			return Strength.Weak;
		}
		if (password.length < 16) {
			return Strength.Medium;
		}
		return Strength.Strong;
	}
}
