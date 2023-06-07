import { createStore } from 'redux';

export class FollowerState {
    public userId: number
    public vacationId: number
    public vacationsFollowing: number[]
    public followerCount: number
}

export enum FollowerActionType {
    Follow,
    Unfollow,
    IsFollowing,
    FollowerCount
}

export interface FollowerAction {
    type: FollowerActionType,
    payload?: any
}

export function followerReducer(currentState = new FollowerState(), action: FollowerAction): FollowerState {
    const newState = {...currentState}

    return newState
}

export const followerStore = createStore(followerReducer)