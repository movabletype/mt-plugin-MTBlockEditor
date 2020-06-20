use ExtUtils::MakeMaker;
use YAML;

my $config = YAML::LoadFile((glob('./plugins/*/config.yaml'))[0]);

WriteMakefile(
    NAME     => $config->{name},
    VERSION  => $config->{version},
    SKIP     => [qw(distdir)],
    DISTNAME => $config->{name},
);

sub MY::top_targets {
    << 'Makefile';
build:
	npm run build

create_distdir :
	$(RM_RF) $(DISTVNAME)
	$(PERLRUN) "-MExtUtils::Manifest=manicopy,maniread" \
		-e "manicopy(maniread(),'$(DISTVNAME)', '$(DIST_CP)');"

distdir : create_distdir build
	$(NOECHO) $(NOOP)

manifest : build

Makefile
}
