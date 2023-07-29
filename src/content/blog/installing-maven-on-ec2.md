---
title: 'Installing Maven on Ec2 Instance'
tags: ['aws', 'maven', 'cloud']
date: '2023-07-28T16:14:39.004Z'
image: 'https://res.cloudinary.com/dezp6utan/image/upload/v1690606345/maxresdefault-968391087_f5tkre.jpg'
imageAlt: 'Maven on EC2'
---

If you have ever built any java tools, you would have come across build tools. One of the most used ones is called Maven. Today we will look at the steps to install Maven on our AWS EC2 instance. 

#### Let us get started. 

1. First, logon to our AWS console. Next we will open the EC2 service page and login to our EC2 instance. To do this, we can either
- use `AWS Instance Connect`
	- Open the Amazon EC2 console at https://console.aws.amazon.com/ec2/.
	- In the navigation pane, choose Instances.
	- Select the instance and choose Connect.
	- Choose EC2 Instance Connect.
	- Verify the user name and choose Connect to open a terminal window
- use an SSH Client (such as the terminal in your computer), making use of the Key-pair that we created and downloaded to our local computers in the previous steps. We can use 
```bash
ssh -i aws_private_key.pem \ 
ubuntu@ec2-3-135-209-28.us-east-2.compute.amazonaws.com
```
- use the AWS cli using the AWS commands such as 
```bash
aws ec2-instance-connect ssh --instance-id i-1234567890example --private-key-file /path/to/key.pem
```

2. To install maven we need to do some reconfiguration. We will use this command to add a repo to our EC2 with a maven package
```bash
sudo wget https://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
```

3.  Next, we need to specify the version that we want to install. Enter the following to determine the version number for the packages that you want to install.
```bash
sudo sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
```

4. Now we can install maven with our package installer. In this case we use Yum
```bash
sudo yum install -y apache-maven
```

5. Jenkins, maven and every other java application needs java to be installed. Let us do that

```bash
sudo yum install java-1.8.0-devel
```

6. Now that we have finished the installation, we now will go ahead and configure it. We need to setup Java as our default runtime. Let us do that with this command
```bash
sudo /usr/sbin/alternatives --config java
```
You will be prompted to enter the version, type `8` to choose version 8 of Java.

7. Java is our runtime now ... last step, we will setup Java also as our compiler with the command
```bash
sudo /usr/sbin/alternatives --config javac
```

Now if you want to run maven ... type the `mvn` command
```bash
mvn 
```
Once you type this, you will see a maven trying to build your app.

#### Yay!!!!!! Great job installing Maven! 

![maven](https://media.tenor.com/SmaOtkf3EsIAAAAC/one-piece-himbo-oden.gif)
