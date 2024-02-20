#!/usr/bin/env bash

helm install grafana edu/grafana \
--set persistence.enabled=true \
--set persistence.existingClaim=grafana \
--set service.type=LoadBalancer \
--set securityContext.runAsUser=1000 \
--set securityContext.runAsGroup=1000 \
--set adminPassword="admin"

sum(kube_pod_status_phase{pod=~"$Pod", namespace=~"$namespace"}) by (phase)