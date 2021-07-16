const nodemailer = require("nodemailer");
const Email = require("email-templates");
const moment = require("moment");


const sendEmailToParticipant = (email, nome, apelidos, conference, emailType) => {

	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: 'ual.conferencias@gmail.com',
			pass: process.env.EMAIL_PASS
		}
	});


	const newEmail = new Email({
		views: { root:'./templates', options: { extension: 'ejs' } },
		message: {
		  from: 'ual.conferencias@gmail.com'
			},
		preview: false,
		send: true,
		transport: transporter            
	  });

	  newEmail
		.send({
			template: emailType,
			message: {
				to: email
				},
			locals: {
				name: nome,
				surname: apelidos,
				title: conference.tema,
				startDate: moment(conference.start).format('LL'),
				startHour: moment(conference.start).format('LT'),
				end: moment(conference.end).format('LT'),
				room: conference.sala,
				link: conference.link
				}
		})
		.then(console.log)
		.catch(console.error);

}

module.exports = {
    sendEmailToParticipant
}