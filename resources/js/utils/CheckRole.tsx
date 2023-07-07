import { checkSubsequence } from "./CheckSubsequence";

export default function CheckRole(
    roles: { role: string }[],
    kriteria: string | string[]
) {
    if (typeof kriteria == "string") {
        return roles.map((role) => role.role).includes(kriteria);
    } else {
        let role = roles.map((role) => role.role);
        return checkSubsequence(kriteria, role);
    }
}
