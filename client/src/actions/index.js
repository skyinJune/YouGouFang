export function login(account) {
    return { type: 'LOGIN', account}
}

export function logout() {
    return { type: 'LOGOUT'}
}

export function communitySelect(selectedCommunity) {
    return { type: 'SELECTCOMMUNITY', selectedCommunity}
}

export function citySelect(selectedCity) {
    return { type: 'SELECTCITY', selectedCity}
}