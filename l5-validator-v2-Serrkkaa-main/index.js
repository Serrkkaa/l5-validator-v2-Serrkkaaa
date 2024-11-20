class Validator {
    string() {
        return {
            isValid: (value) => typeof value === 'string' || value === null || value === '',
        };
    }

    email() {
        let minLength = null;
        let maxLength = null;

        return {
            setEmailLengthConstraint(min, max) {
                minLength = min;
                maxLength = max;
                return this; 
            },

            isValid(value) {
                if (typeof value !== 'string' || !value.includes('@')) {
                    return false;
                }

                const localPart = value.split('@')[0];
                if (minLength !== null && localPart.length < minLength) {
                    return false;
                }
                if (maxLength !== null && localPart.length > maxLength) {
                    return false;
                }

                return true;
            },
        };
    }

    age() {
        let checkAdult = false;

        return {
            isAdult() {
                checkAdult = true;
                return this; 
            },

            isValid(value) {
                if (typeof value !== 'number') {
                    return false;
                }
                if (checkAdult && value < 18) {
                    return false;
                }

                return true;
            },
        };
    }
}

export default Validator;

const v = new Validator();

const stringSchema = v.string();
console.log(stringSchema.isValid(null));
console.log(stringSchema.isValid(''));
console.log(stringSchema.isValid(123));

const emailSchema = v.email().setEmailLengthConstraint(3, 10);
console.log(emailSchema.isValid('abc@domain.com'));
console.log(emailSchema.isValid('a@domain.com'));
console.log(emailSchema.isValid('abcdefghi@domain.com'));

const ageSchema = v.age().isAdult();
console.log(ageSchema.isValid(25));
console.log(ageSchema.isValid(17));
