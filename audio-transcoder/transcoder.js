const polly = require('./Polly');
const s3 = require('./S3');

const handler = (event, context, callback) => {
    console.log(event);
    const res = event.Records.map( record => {
        if(record.eventName !== 'REMOVE'){
            const description = record.dynamodb.NewImage.description.S;
            const id = record.dynamodb.NewImage.id.S;
            console.log(description);
            return polly.convertTextToVoice(description)
                .then((audioStream) => {
                    console.log(audioStream);
                    return s3.saveFile(id,audioStream.AudioStream)
                })
                .then(() => console.log('saved',))
                .catch((e) => console.log('error',e));
        }

    });
    Promise.all(res);
    console.log('end transcoder');
    callback(null, 'audio transcoder ok');
};

exports.handler = handler;

