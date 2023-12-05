export type candidateProps = {
    candidate_id: string,
    createdAt: string
    updatedAt: string,
    status: string,
    empId: string,
    candidate_designation?: string,
    candidate_edu?: string,
    candidate_email?: string,
    candidate_gpa?: string,
    candidate_name?: string
    candidate_nationality?: string
    candidate_phone?: string,
    file?: file,
    langs?: langs[],
    skills?: skills[],
    xp: xp[]

}

export type file = {
    file_name: string
}
export type langs = {
    cl_id: string
    cl_name: string
}
export type skills = {
    ck_id: string
    ck_name: string
}
export type xp = {
    cxp_id: string
    cxp_duration: string
    cxp_position: string
}