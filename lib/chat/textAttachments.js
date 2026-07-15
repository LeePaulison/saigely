const ATTACHMENT_MARKER = "__SAIGELY_TEXT_ATTACHMENTS_V1__";

export function serializeTextAttachments(message, attachments) {
  if (!attachments.length) {
    return message;
  }

  return `${ATTACHMENT_MARKER}\n${JSON.stringify({
    message,
    attachments: attachments.map(({ name, type, size, content }) => ({
      name,
      type,
      size,
      content,
    })),
  })}`;
}

export function parseTextAttachmentMessage(content) {
  if (
    typeof content !== "string" ||
    !content.startsWith(`${ATTACHMENT_MARKER}\n`)
  ) {
    return { message: content, attachments: [] };
  }

  try {
    const parsed = JSON.parse(content.slice(ATTACHMENT_MARKER.length + 1));

    if (typeof parsed.message !== "string" || !Array.isArray(parsed.attachments)) {
      return { message: content, attachments: [] };
    }

    return {
      message: parsed.message,
      attachments: parsed.attachments.filter(
        (attachment) =>
          attachment &&
          typeof attachment.name === "string" &&
          typeof attachment.content === "string",
      ),
    };
  } catch {
    return { message: content, attachments: [] };
  }
}
