#!/usr/bin/env bash

# install packages 
yum install epel-release -y
yum install vim-enhanced -y
yum install git -y

# install docker 
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install docker-ce-18.06.0.ce-3.el7 docker-ce-cli-18.06.0.ce-3.el7 \
    containerd.io-1.2.6-3.3.el7 -y
systemctl enable --now docker

# install kubernetes cluster 
yum install kubectl kubelet kubeadm -y
systemctl enable --now kubelet