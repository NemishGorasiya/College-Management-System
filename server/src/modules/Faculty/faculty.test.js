import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import { ADMINLOGIN, FACULTYDATA, FACULTYLOGIN } from '../../../constants.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Faculty Registration Tests', () => {
    let adminCookie;

    beforeEach((done) => {
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

    context('Faculty Registration', () => {
        it('should register the faculty with valid data', (done) => {
            chai.request(app)
                .post('/api/faculty/register')
                .set('Content-Type', 'application/json')
                .set('Cookie', adminCookie || '') // Provide an empty string if adminCookie is null
                .send(FACULTYDATA)
                .end((err, res) => {
                  
                        if (res.status === 201) {
                            expect(res).to.have.status(201);
                            expect(res.body).to.have.keys(["message", "faculty"]);
                        } else if (res.status === 500) {
                            expect(res.body).to.have.property("message", "A user with the given username is already registered");
                        }
                        done();
                    
                });
        });
    });

    context('Faculty Login', () => {
        it('Should Faculty can login with valid data', (done) => {
            chai.request(app)
                .post('/api/faculty/login')
                .set('Content-Type', 'application/json')
                .send(FACULTYLOGIN)
                .end((err, res) => {
            
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.keys(["message", "user"]);
                        done(err);
                    
                });
        });
    });
});
