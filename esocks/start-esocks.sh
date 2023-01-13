#!/bin/ash

#nohup /usr/sbin/sshd -D -e -f /etc/ssh/sshd_config  > /dev/null  &

if [ "$CONFIG" == "" ]; then
 /opt/esocks/esocks > /dev/null  &	
else
 /opt/esocks/esocks -config /opt/esocks/$CONFIG > /dev/null  &	
fi

