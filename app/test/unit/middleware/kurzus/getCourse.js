const expect = require('chai').expect;
const getCourse = require('../../../../middleware/kurzus/getCourse');

describe('getCourse middleware ', function () {
    it('should set res.locals.kurzus', function(done){
        const mw = getCourse({
            courseModel: {
                findOne: (p, cb) =>{
                    expect(p).to.be.eql({_id: '5'});
                    cb(null, 'jofeleKurzus');
                }
            }
        });
        var resMock = {
            locals: {}
        };
        mw({
            params: {
                courseid: '5'
            }
        },
        resMock,
        () => {
            expect(resMock.locals).to.be.eql({kurzus: 'jofeleKurzus'});
            done();
        }
        );
    });
    it('should call next with error, err in db', function(done){
        const mw = getCourse({
            courseModel: {
                findOne: (p, cb) =>{
                    expect(p).to.be.eql({_id: '5'});
                    cb('error', 'mockmockmock');
                }
            }
        });
        var resMock = {
            locals: {}
        };
        mw({
            params: {
                courseid: '5'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql('error');
            expect(resMock.locals).to.be.eql({});
            done();
        }
        );
    });
    it('should call next with error, course is not found', function(done){
        const mw = getCourse({
            courseModel: {
                findOne: (p, cb) =>{
                    expect(p).to.be.eql({_id: '5'});
                    cb(undefined, null);
                }
            }
        });
        var resMock = {
            locals: {}
        };
        mw({
            params: {
                courseid: '5'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({});
            done();
        }
        );
    });
  });