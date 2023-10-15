export default function GetLinkId(linkdrive: string) {
    if (linkdrive.indexOf("https://drive.google.com") === 0) {
        let link = linkdrive.split("/file/d/");
        if (link.length >= 2) {
            let link_id = link[1];
            let check_view = link_id.indexOf("/view");
            let check_preview = link_id.indexOf("/preview");
            if (Boolean(check_view) === true) {
                link_id = link_id.substring(0, check_view);
            } else if (Boolean(check_preview) === true) {
                link_id = link_id.substring(0, check_preview);
            } else {
                link_id = linkdrive;
            }
            return link_id;
        }
    } else {
        return linkdrive;
    }
}
