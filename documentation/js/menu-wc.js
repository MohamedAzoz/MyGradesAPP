'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">my-grade documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/PrimengModulesModule.html" data-type="entity-link" >PrimengModulesModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AddAssistantsComponent.html" data-type="entity-link" >AddAssistantsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddDoctorsComponent.html" data-type="entity-link" >AddDoctorsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddStudentsComponent.html" data-type="entity-link" >AddStudentsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChangePasswordComponent.html" data-type="entity-link" >ChangePasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ImportgradesComponent.html" data-type="entity-link" >ImportgradesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainComponent.html" data-type="entity-link" >MainComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MyGradesComponent.html" data-type="entity-link" >MyGradesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MySubjectsComponent.html" data-type="entity-link" >MySubjectsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavBarComponent.html" data-type="entity-link" >NavBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotFoundComponent.html" data-type="entity-link" >NotFoundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent-1.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent-2.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StudentsGradesComponent.html" data-type="entity-link" >StudentsGradesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SubjectInfoComponent.html" data-type="entity-link" >SubjectInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TemplateGradesComponent.html" data-type="entity-link" >TemplateGradesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TemplateStudentsComponent.html" data-type="entity-link" >TemplateStudentsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TemplateStudentsGradesComponent.html" data-type="entity-link" >TemplateStudentsGradesComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/APIAssistantService.html" data-type="entity-link" >APIAssistantService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/APIDepartmentService.html" data-type="entity-link" >APIDepartmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/APIDoctorService.html" data-type="entity-link" >APIDoctorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/APIExportService.html" data-type="entity-link" >APIExportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/APIGradeService.html" data-type="entity-link" >APIGradeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/APIStudentService.html" data-type="entity-link" >APIStudentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/APISubjectService.html" data-type="entity-link" >APISubjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthServiceService.html" data-type="entity-link" >AuthServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotifecationsService.html" data-type="entity-link" >NotifecationsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AcademicLevel.html" data-type="entity-link" >AcademicLevel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Department.html" data-type="entity-link" >Department</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAssistant.html" data-type="entity-link" >IAssistant</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IChangePassword.html" data-type="entity-link" >IChangePassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDoctor.html" data-type="entity-link" >IDoctor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGrade.html" data-type="entity-link" >IGrade</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGradeModel.html" data-type="entity-link" >IGradeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogin.html" data-type="entity-link" >ILogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResponse.html" data-type="entity-link" >IResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResult.html" data-type="entity-link" >IResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStudent.html" data-type="entity-link" >IStudent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISubject.html" data-type="entity-link" >ISubject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISubjectDto.html" data-type="entity-link" >ISubjectDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});