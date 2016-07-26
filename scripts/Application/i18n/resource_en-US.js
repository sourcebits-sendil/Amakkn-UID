(function (angularJS) {
    /* English - US translations---------------------------------------------*/
    angular.module('ngApp').value('SITE_RESOURCES_CONTENT', {
        Pages: {
            Login: {
                Title: 'Login'
            },
            UserProfile: {
                Title: 'My Profile'
            },
            Organisation: {
                Title: 'Manage organisation'
            },
            Department: {
                Title: 'Department'
            },
            AssociateWegyanKey: {
                Title: 'Associate Wegyan Key'
            },
            AddVideoCourse: {
                Title: 'Add Video Course'
            }

        }
    }).value('User_Profile_Resource', {
        ScreenText: {
            ConctactTab: "Contact",
            AboutMeTab: "About me",
            ProtfolioTab: "Portfolio"
        },
        AjaxSuccessMessage: {
            UpdateUserEmail: 'Email Id updated successfully.',
            UpdateUserPhone: 'Contact number updated successfully.',
            UpdateUserExperience: 'Experience updated successfully.',
            UpdateUserName: 'Name updated successfully.',
            UpdateTitle: 'Title updated successfully.',
            AddUserExperience: 'Experience added successfully.',
            AddUserEducation: 'Education added successfully.',
            AddUserContact: 'Contact added successfully.',
            AddUserAchievement: 'Achievement added successfully.',
            DeletedUserExperience: 'Successfully deleted work experience detail.'
        },
        AjaxErrorMessage: {
            GetUserInfo: 'Not able to fetch user Information.',
            GetUserContactList: 'Not able to fetch user contact list.',
            UpdateUserEmail: 'Not able to updated Email Id.',
            UpdateUserPhone: 'Not able to updated Contact number .',
            UpdateUserExperience: 'Not able to update your experience information.',
            UpdateUserName: 'Not able to update your name.',
            UpdateTitle: 'Not able to update your title.',
            AddUserContact: 'Not able to add you contact.',
            AddUserExperience: 'Not able to save your new experience information.',
            AddUserEducation: 'Not able to save your new education information.',
            AddUserAchievement: 'Not able to save your achievement information.',
            DeletedUserExperience: 'Not able to delete work experience.'
        },
        Validation: {
            EmptyEmailId: "Email id is not provided.",
            EmptyPhoneNo: "Phone number is not provided.",
            EmptyDetails: "Missing details."
        }
    })
    .value('Home_Resource', {
        ScreenText: {
        },
        AjaxSuccessMessage: {
            CreateOrganisation: 'Organisation created successfully and request sent for background verification.',
        },
        AjaxErrorMessage: {
            CreateOrganisation: 'Not able to create organisation.',
            GetOrganisationTypes: 'Not able to fetch organisation types.',
        },
        Validation: {
            EmptyDetails: "Missing details."
        }
    })
    .value('Organisation_Resource', {
        ScreenText: {
        },
        AjaxSuccessMessage: {
            DeleteDepartment: 'Department deleted successfully.',
            AssignKeysToDepartment: 'Keys added successfully.',
            AddDepartment: 'Department added successfully.',
            UpdateDepartment: 'Department name updated successfully.',
            AddTeacher: 'Teacher added successfully.',
            UpdateDepartmentKeys: 'Department details updated successfully.',
            AddTeacher: 'Teacher added successfully.',
            DeleteTeacher: 'Teacher(s) deleted successfully.',
            DeleteOrganisation: 'Organisation(s) deleted successfully.'
        },
        AjaxErrorMessage: {
            GetDepartmentList: 'Not able to fetch department list.',
            DeleteDepartment: 'Not able to delete department(s).',
            AssignKeysToDepartment: 'Not able to add keys.',
            AddDepartment: 'Not able to add department.',
            UpdateDepartment: 'Not able to update department name.',
            GetActiveTeachersList: 'Not able to fetch active teachers List.',
            GetInactiveTeachersList: 'Not able to fetch inactive teachers List.',
            UpdateDepartmentKeys: 'Not able to update department details.',
            GetTeachersList: 'Not able to fetch teachers List.',
            GetTeachersList: 'Not able to fetch teachers List.',
            GetOrganisationList: 'Not able to fetch organisation List.',
            DeleteTeacher: 'Not able to delete department(s).',
            DeleteOrganisation: 'Not able to delete organisation(s).'
        },
        Validation: {
            EmptyDetails: "Missing details."
        },
        NoDataFoundMessage: {
            NoTeacherFound: 'No teacher found.',
            NoActiveTeachers: 'No active teachers found.',
            NoInactiveTeachers: 'No in-active teachers found.',
            NoOrganisation: 'No organisation found.',
            NoActiveOrganisation: 'No active organisation found.',
            NoInactiveOrganisation: 'No in-active organisation found.',
        },
    })
    .value('Video_Resource', {
        ScreenText: {
        },
        AjaxSuccessMessage: {
            UpdateVideoSection: 'Updated section details successfully.',
            CreateOffering: 'Course created successfully.',
            UpdateOffering: 'Basic information updated successfully.',
            CreateVideoCourseLecture: 'Lecture added successfully.',
            CreateVideoCourseLecture: 'Section added successfully.'
        },
        AjaxErrorMessage: {
            GetOfferingCategoryList: 'Not able to fetch offering category.',
            UpdateVideoSection: 'Not able to udpate section details.',
            CreateOffering: 'Not able to create course successfully.',
            UpdateOffering: 'Not able to update basic information.',
            GetSectionLectureByOfferingId: 'Not able to fetch section and lecture details.',
            GetOfferingsByUserId: 'Not able to fetch course list.',
            CreateVideoCourseLecture: 'Not able to add lecture.',
            CreateVideoCourseLecture: 'Not able to add section.'
        },
        Validation: {
        },
        NoDataFoundMessage: {
        },
    });
})(angular);