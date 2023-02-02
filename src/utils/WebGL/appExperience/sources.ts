/**
 * THIS FILE CONTAINS ALL THE ASSESTS e.g textures, THAT WILL BE USED IN THE LOGIN PAGE EXPERIENCE
 */

import { Sources } from '../utils/types'

const groupNames = ["airpods"]

const sourcesDefault = [
    {
        name: 'airpod1',
        type: 'gltfModel',
        path: '/webGL/airpod1.glb',
        useDraco: true,
        groupName: 'airpods',
    },
    {
        name: 'airpod2',
        type: 'gltfModel',
        path: '/webGL/airpod2.glb',
        useDraco: true,
        groupName: 'airpods',
    },
    {
        name: 'airpod3',
        type: 'gltfModel',
        path: '/webGL/airpod3.glb',
        useDraco: true,
        groupName: 'airpods',
    },
    {
        name: 'airpod4',
        type: 'gltfModel',
        path: '/webGL/airpod3.glb',
        useDraco: true,
        groupName: 'airpods',
    },
    {
        name: 'airpod5',
        type: 'gltfModel',
        path: '/webGL/airpod3.glb',
        useDraco: true,
        groupName: 'airpods',
    },
] as const

const sourcesDefaultClone = ([...sourcesDefault] as any) as Sources[];

// get the total number of sources in the same group
groupNames.forEach((name) => {
    const members = sourcesDefaultClone.filter(source => source.groupName === name);

    sourcesDefaultClone.forEach(source => {
        source.totalGroupMember = members.length
    })
})

export type sourcesDefaultNames = typeof sourcesDefault[number]["name"];

export { sourcesDefaultClone };