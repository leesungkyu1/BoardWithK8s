#!/usr/bin/env bash

echo "[Step 1/4] Task [Check helm status]"
if [ ! -e "/usr/local/bin/helm" ]; then
    echo "[Step 1/4] helm not found"
    exit 1
fi
echo "[Step 1/4] ok"

echo "[Step 2/4] Task [Check MetalLB status]"
namespace=$(kubectl get namespace metallb-system -o jsonpath={.metadata.name} 2> /dev/null)
if [ "$namespace" == "" ]; then
    echo "[Step 2/4] metallb not found"
    exit 1
fi
echo "[Step 2/4] ok"

nfsdir=/nfs/prometheus/alertmanager
echo "[Step 3/4] Task [Create NFS directory for alertmanager]"
if [ ! -e "$nfsdir" ]; then
    if [[ ! -d $nfsdir ]]; then
        mkdir -p $nfsdir
        echo "$nfsdir 192.168.1.0/24(rw,sync,no_root_squash)" >> /etc/exports
        if [[ $(systemctl is-enabled nfs) -eq "disabled" ]]; then
            systemctl enable nfs
        fi
        systemctl restart nfs
    fi
    chown 1000:1000 $nfsdir
    echo "[Step 3/4] Successfully completed"
else
    echo "[Step 3/4] failed: $nfsdir already exists"
    exit 1
fi

echo "[Step 4/4] Task [Create PV,PVC for alertmanager]"
pvc=$(kubectl get pvc prometheus-alertmanager -o jsonpath={.matadata.name} 2> /dev/null)
if [ "$pvc" == "" ]; then
    kubectl apply -f ./prometheus-alertmanager-volume.yaml
    echo "[Step 4/4] Successfully completed"
else
    echo "[Step 4/4] failed: prometheus-alertmanager pv,pvc already exist" 
fi