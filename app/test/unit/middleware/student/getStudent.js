const expect = require('chai').expect;
const getStudent = require('../../../../middleware/student/getStudent');

describe('getStudent middleware ', function () {
    it('should set res.locals.student', function(done){
        const mw = getStudent({
            studentModel: {
                findOne: (p, cb) =>{
                    expect(p).to.be.eql({_id: '5'});
                    cb(null, 'studentVagyok');
                }
            }
        });
        var resMock = {
            locals: {}
        };
        mw({
            params: {
                userid: '5'
            }
        },
        resMock,
        () => {
            expect(resMock.locals).to.be.eql({student: 'studentVagyok'});
            done();
        }
        );
    });
    it('should call next with error, err in db', function(done){
        const mw = getStudent({
            studentModel: {
                findOne: (p, cb) =>{
                    expect(p).to.be.eql({_id: '5'});
                    cb('error', 'studentVagyok');
                }
            }
        });
        var resMock = {
            locals: {}
        };
        mw({
            params: {
                userid: '5'
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
    it('should call next with error, student is not found', function(done){
        const mw = getStudent({
            studentModel: {
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
                userid: '5'
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