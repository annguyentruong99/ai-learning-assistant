export * from "./user.service";
// export * from "./auth-service";
// export * from "./document-service";
// export * from "./question-service";
// export * from "./review-record-service";
// export * from "./review-session-service";

// Export singleton instances
import { userService } from "./user.service";
// import { documentService } from "./document-service";
// import { questionService } from "./question-service";
// import { reviewRecordService } from "./review-record-service";
// import { reviewSessionService } from "./review-session-service";

export const services = {
	user: userService,
	// document: documentService,
	// question: questionService,
	// reviewRecord: reviewRecordService,
	// reviewSession: reviewSessionService,
};
