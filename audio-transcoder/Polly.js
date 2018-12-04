const AWS = require('aws-sdk');

const convertTextToVoice = function(data){
    const polly = new AWS.Polly();
    console.log('data',data);
    const params = {
        OutputFormat: "mp3",
        SampleRate: "8000",
        Text: data,
        TextType: "text",
        VoiceId: 'Amy'
    };
    return polly.synthesizeSpeech(params).promise();

};


exports.convertTextToVoice = convertTextToVoice;
