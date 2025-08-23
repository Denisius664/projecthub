export interface Project {
    id: string
    title: string
    status: string
    createdAt: string
    description: string
    tags: string[]
    knowledgeArea: string[]
    participants: number
    citationIndex: number
    linkedProjects: { id: string }[]
}