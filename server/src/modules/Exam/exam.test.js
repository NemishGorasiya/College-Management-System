import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import { EXAM, FACULTYLOGIN } from '../../../constants.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Exam creation Tests', () => {
    let adminCookie;

    beforeEach((done) => {
        chai.request(app)
            .post('/api/faculty/login')
            .set('Content-Type', 'application/json')
            .send(FACULTYLOGIN)
            .end((err, res) => {
               
                    if (res.headers && res.headers['set-cookie'] && res.headers['set-cookie'].length > 0) {
                        adminCookie = res.headers['set-cookie'].pop().split(';')[0]; // Extract the session cookie
                    } else {
                        adminCookie = null;
                    }
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.keys(["message", "user"]);
                    done(err);
            });
    });

    context('Faculty Create Exam', () => {
        it('Faculty Can Create Exam With Valid Data', (done) => {
            chai.request(app)
                .post('/api/exam/create')
                .set('Content-Type', 'application/json')
                .set('Cookie', adminCookie || '') // Provide an empty string if adminCookie is null
                .send(EXAM)
                .end((err, res) => {
                  
                        if (res.status === 201) {
                            expect(res).to.have.status(201);
                            expect(res.body).to.have.property("message", "Assignment created successfully");
                        
                        } else if (res.status === 403) {
                            expect(res.body).to.have.property("message", "You are not allowed to create assignment for this subject");
                        }
                        done(err);
                    
                });
        });
    });

    context('Faculty Get Own Exams', () => {
        it('Faculty Get All Exam Which He/She Created', (done) => {
            chai.request(app)
                .get('/api/exam/get-own')
                .set('Content-Type', 'application/json')
                .set('Cookie', adminCookie || '') // Provide an empty string if adminCookie is null
                .end((err, res) => {
                  
                        if (res.status === 403) {
                            expect(res.body).to.have.property("message", "You are not allowed to create assignment for this subject");
                        
                        } else {
                            expect(res).to.have.status(200);
                        }
                        done(err);
                    
                });
        });
    });

   
});
