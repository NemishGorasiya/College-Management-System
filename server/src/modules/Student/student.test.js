import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js'
import { ADMINLOGIN, FILE, STU_DATA, STU_LOGIN, STU_UPDATE, assignmentId } from '../../../constants.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Student Registration Tests', () => {

    let adminCookie; 
    before((done) => {
        chai.request(app)
            .post('/api/admin/login')
            .set('Content-Type', 'application/json')
            .send(ADMINLOGIN)
            .end((err, res) => {
                
                    if (res.headers && res.headers['set-cookie'] && res.headers['set-cookie'].length > 0) {
                        adminCookie = res.headers['set-cookie'].pop().split(';')[0]; // Extract the session cookie
                    } else {
                        adminCookie = null;
                    }
                    expect(res).to.have.status(200);
                    done(err);
                
            });
    });

    context('Student Registration', () => {
        it('should register the student with valid data', (done) => {

            chai.request(app) // Assuming indexRoutes is your Express app instance
                .post('/api/student/register')
                .set('Content-Type', 'application/json')
                .set('Cookie', adminCookie) 
                .send(STU_DATA)
                .end((err, res) => {
                    if(res.status==201){
                        expect(res).to.have.status(201);
                        expect(res.body).to.have.keys(["message", "student"])
                    }
                    else if(res.status==500){
                        expect(res.body).to.have.property("message", "A user with the given username is already registered")
                    }
                    done(err); // Call done() to indicate the test is complete
                });
        });
    });


    context('Student Login',()=>{
        it('Should Student can login with valid data',(done)=>{
            chai.request(app) // Assuming indexRoutes is your Express app instance
            .post('/api/student/login')
            .set('Content-Type', 'application/json')
            .send(STU_LOGIN)
            .end((err, res) => {
                adminCookie = res.headers['set-cookie'].pop().split(';')[0]; // Extract the session cookie
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys(["message", "user"])
                done(err); // Call done() to indicate the test is complete
            })
        })
    })


    context('Student Update Request', () => {
        it('student can send update Request', (done) => {

            chai.request(app) // Assuming indexRoutes is your Express app instance
                .patch('/api/student/update/request')
                .set('Content-Type', 'application/json')
                .set('Cookie', adminCookie) 
                .send(STU_UPDATE)
                .end((err, res) => {
                    if(res.status==201){
                        expect(res).to.have.status(201);
                        expect(res.body).to.have.keys(["message", "studentUpdateRequest"])
                    }  else if(res.status==403){
                        expect(res.body).to.have.property("message", "User does not have the required permissions")
                    }
                 
                    done(err); // Call done() to indicate the test is complete
                });
        });
    });


    context("Submit Assignment",()=>{
        it('student can submit assignment ',(done)=>{
            chai.request(app) // Assuming indexRoutes is your Express app instance
            .post(`/api/student/submit-assignment/${assignmentId}`)
            .set('Content-Type', 'application/json')
            .set('Cookie', adminCookie) 
            .send(FILE)
            .end((err, res) => {

                if(res.status==201){
                    expect(res.body).to.have.keys(["message", "submittedAssignment","assignment"])
                }
                else if(res.status==404){
                    expect(res.body).to.have.property("message", 'Assignment not found')
                } 
                else if(res.status==500){
                    expect(res.body).to.have.property("message")
                }
                else {
                    expect(res).to.have.status(403);
                    expect(res.body).to.have.property("message", "User does not have the required permissions")
                }
             
                done(err); // Call done() to indicate the test is complete
            });
        })
    })


    context("Student Get All Assignment",()=>{
        it('student can Show All assignment ',(done)=>{
            chai.request(app) // Assuming indexRoutes is your Express app instance
            .get(`/api/student/assignments`)
            .set('Content-Type', 'application/json')
            .set('Cookie', adminCookie) 
            .end((err, res) => {

                if(res.status==200){
                    expect(res.body).to.have.keys(["message", "submittedAssignments","nonSubmittedAssignments"])
                }
                  else {
                    expect(res).to.have.status(403);
                    expect(res.body).to.have.property("message", "User does not have the required permissions")
                }
             
                done(err); // Call done() to indicate the test is complete
            });
        })
    })
});
