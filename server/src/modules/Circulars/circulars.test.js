import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import { ADMINLOGIN, EXAM, circularId } from '../../../constants.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Exam creation Tests', () => {
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

    context('Get Circulars', () => {
        it('Anyone Can See Circulars', (done) => {
            chai.request(app)
                .get('/api/circular')
                .set('Content-Type', 'application/json')
                .set('Cookie', adminCookie || '') // Provide an empty string if adminCookie is null
                .end((err, res) => {

                    expect(res).to.have.status(200);
                    expect(res.body).to.have.keys(["message", "circulars"])
                    done(err);

                });
        });
    });

    context('Admin Delete Circulars', () => {
        it('Admin can delete Circulars', (done) => {
            chai.request(app)
                .delete(`/api/circular/${circularId}`)
                .set('Content-Type', 'application/json')
                .set('Cookie', adminCookie || '') // Provide an empty string if adminCookie is null
                .end((err, res) => {

                    if (res.status === 200) {
                        expect(res.body).to.have.property("message", "Circular deleted successfully");

                    } else {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property("message", "Circular not found");
                    }
                    done(err);

                });
        });
    });


});
