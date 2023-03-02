import { body } from 'express-validator';

const phoneRegEx = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g

const validator = {
    email: body('email').isEmail().withMessage('Email is not valid.').normalizeEmail({ gmail_remove_dots: false }),
    name: body('name', 'Name is not empty.').notEmpty().trim(),
    password: body('password', 'Password must have aleast 6 characters.').isLength({ min: 6 }).isAlphanumeric().trim(),
    confirmPassword: body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Confirm Password does not match!');
        }
        return true;
    }),
    phone: body('phone').trim().notEmpty().withMessage('Phone is not empty.').matches(phoneRegEx),
    address: body('address').trim().notEmpty().withMessage('Address is not empty.')
};

const signupValidations = [ 
    validator.email, 
    validator.name, 
    validator.password, 
    validator.confirmPassword, 
    validator.phone,
    validator.address
];

const loginValidations = [ validator.email ];

const forgotPasswordValidations = [ validator.email ];

const resetPasswordValidations = [ validator.password, validator.confirmPassword ];

export {
    signupValidations,
    loginValidations,
    forgotPasswordValidations,
    resetPasswordValidations
};



