export default function makeAlphanumeric(text: string, otherCharacters?: string): string {
    const regex = new RegExp(`[^a-zA-Z0-9${otherCharacters ?? ""}]`, "g");
    return text.replace(regex, "");
}