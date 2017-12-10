// Node.js 6.10

exports.handler = (event, context, callback) => {
    
    // Load the AWS SDK for Node.js
    var AWS = require('aws-sdk');
    
    // Set the region 
    AWS.config.update({region: 'ap-northeast-1'});
    
    // Create EC2 service object
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    
    var params = {
        ImageId: 'ami-da9e2cbc', // Amazon Linux AMI 2017.09.1
        InstanceType: 't2.micro',
        MinCount: 1,
        MaxCount: 1,
        KeyName: 'ec2-key',
        SecurityGroups: ['ec2-ssh']
    };
    
    // Create the instance
    ec2.runInstances(params, function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        
        // Wait for EC2 boot
        sleep(300);
        
        // Get instanceId
        var params2 = {
            InstanceIds: [
            	data.Instances[0].InstanceId
            ]
        };
        
        // Get public ipv4 address
        ec2.describeInstances(params2, function(err, data) {
            if (err) {
                console.log(err);
                return;
            }
            
            // Return instance data.
            callback(null, data.Reservations[0].Instances[0]);
        });
    });
    
    
    // Sleep function
    function sleep(time) {
    	var d1 = new Date();
        while (true) {
            var d2 = new Date();
            if (d2 - d1 > time) {
                return;
            }
        }
    }
};